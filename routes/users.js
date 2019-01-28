const router = require('express').Router();
const User = model('users');
const debug = require('debug')('route:users')
const _ = require('lodash')

// GET all users
router.get('/', async (req, res) => {
  // Allow fetching of deleted users
  const level = req.query.level || 'active';
  let params;

  if (level == 'all') params = {}
  else params = { isDeleted: level }

  const users = await User.find(params)
    .sort({ firstName: 1 })
    .select('-__v')

  if (!users) {
    return res.status(200).json({
      status: false,
      message: 'No users found'
    })
  }

  return res.status(200).json({
    status: true,
    'data': users
  });
});

// Create a new user
router.post('/', async (req, res, next) => {
  // create user and store in db
  const user = await new User({ ...req.body });
  await user.save()
  debug(user)

  if (!user) throw new Error('Unable to create user');

  return res.status(201).json({
    status: true,
    message: 'User created successfully',
    data: user
  });
})

// Get user by id
router.get('/:id', async (req, res) => {
  // Attempt to find user
  const id = req.params.id;
  const user = await User.findById(id)
  .and({isDeleted: 'active'})
  .limit(1)

  if (!user || user.length == 0) {
    return res.status(404).json({
      status: false,
      message: `user with id ${id} not found`
    })
  }

  return res.status(200).json({
    status: true,
    data: user
  });
})

// Update an existing user
router.put('/:id', async (req, res) => {
  let user;
  user = await User.findById(req.params.id)
  .and({isDeleted: 'active'})
  .select('-__v');

  // Handle user not found
  if (!user) {
    return res.status(404).json({
      status: false,
      message: 'User not found'
    });
  }

  // Update attributes
  Object.entries(req.body).forEach(entry => {
    user[entry[0]] = entry[1]
  })

  // Save user
  await user.save()

  return res.status(201).json({
    status: true,
    message: 'User updated successfully',
    data: user
  });
})

// Delete user by id and level
router.delete('/:id', async (req, res) => {
  // Set delete level
  const id = req.params.id;
  const deleteLevel = req.query.level || 'soft';
  let user;

  // Attempt to find user first
  user = await User.findById(id)
  if (!user) {
    return res.status(404).json({
      status: false,
      message: 'User not found'
    })
  }

  // Handle permanent delete from db
  if (deleteLevel === 'hard') {
    user.isDeleted = deleteLevel
    await user.remove()

    return res.status(200).json({
      status: true,
      message: 'User deleted from database successfully',
      data: (user)
    })
  }

  // Check if user is soft-deleted already
  if (user.isDeleted == 'soft') {
    return res.status(405).json({
      status: false,
      message: 'User already soft deleted',
      data: [_.pick(user, ['id', 'firstName', 'lastName'])]
    })
  }

  // Handle soft delete
  user.isDeleted = deleteLevel
  await user.save()

  return res.status(200).json({
    status: true,
    message: 'User soft deleted successfully',
    data: user
  })
})

// Get user by any param e.g /by?user[bankName]=Diamond
router.get('/all/by/', async (req, res) => {
  const key = Object.keys(req.query.user)[0];
  const value = Object.values(req.query.user)[0]

  const user = await User.find({[key]: value})

  if (!user || user.length == 0) {
    return res.status(404).json({
      status: false,
      message: `user with ${key} ${value} not found`
    })
  }

  return res.status(200).json({
    status: true,
    data: user
  });
})

module.exports = router;
