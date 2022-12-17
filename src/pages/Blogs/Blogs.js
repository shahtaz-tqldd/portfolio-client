import React from 'react'
import useTitle from '../../hooks/useTitle'
import BlogCard from './components/BlogCard'

const Blogs = () => {
  useTitle('Blogs')
  const blogs = [
    {
      "id": 1,
      "title": "My Noob Web Dev Journey",
      "img": "https://img.freepik.com/free-vector/hand-drawn-web-developers_23-2148819604.jpg?w=2000",
      "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      "date": "Nov 22, 2022",
      "tags":[
        "web development",
        "JavaScript",
        "React"
      ]
    },
    {
      "id": 2,
      "title": "First React Project",
      "img": "https://www.webskittersacademy.in/wp-content/uploads/2015/08/Web-Developer-skill.jpg",
      "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      "date": "Nov 22, 2022",
      "tags":[
        "JavaScript",
        "React",
        "ES6",
      ]
    },
    {
      "id": 3,
      "title": "Next JS for alternate of React",
      "img": "https://media.istockphoto.com/id/1219473620/vector/young-female-character-writing-code-on-a-desktop-computer-working-from-home-millennials-at.jpg?s=612x612&w=0&k=20&c=zOE7SRWT0gSIVxrioPGTFWpWwXE0_aYsF3ub6q9U3Ho=",
      "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      "date": "Nov 22, 2022",
      "tags":[
        "Next JS",
        "React",
        "JavaScript",
      ]
    },
  ]
  return (
    <div>
      <h2 className='text-2xl font-bold mt-12'>Noob Dev. Blogs</h2>
      <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 mt-8'>
        {
          blogs.map(blog => <BlogCard key={blog.id} blog={blog} />)
        }
      </div>
    </div>
  )
}

export default Blogs