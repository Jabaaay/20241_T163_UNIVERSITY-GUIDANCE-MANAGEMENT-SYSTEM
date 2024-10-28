const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello World');
})


app.get('/login/admin', function (req, res) {
    res.send('Log In as Admin');
  })

  app.get('/admin_dashboard', function (req, res) {
    res.send('Dashboard');
    
  })

  app.get('/admin_appoinment', function (req, res) {
    res.send('Pending Appointments');
  })

  app.get('/admin_reports', function (req, res) {
    res.send('Report Generation');
  })

  app.get('/post_announcements', function (req, res) {
    res.send('Upload Announcements');
  })

  app.post('/post_announcements/post', function (req, res) {
    res.send('Post Annoucements');
  })

  app.get('/admin_profile', function (req, res) {
    res.send('Admin Profile');
  })

  app.patch('/admin_profile/edit', function (req, res) {
    res.send('Update Admin Profile');
  })

  app.get('/notifications', function (req, res) {
    res.send('Notifications');
  })

  app.get('/add_staff', function (req, res) {
    res.send('Add Staff');
  })

  app.post('/add_staff/send', function (req, res) {
    res.send('Send Invites as Staff');
  })

  app.get('/notifications/message', function (req, res) {
    res.send('Messages');
  })

  app.post('/notifications/message/reply', function (req, res) {
    res.send('Send Messages');
  })


app.listen(4000)