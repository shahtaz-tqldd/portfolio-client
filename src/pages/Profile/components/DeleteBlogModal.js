import React from 'react'

const DeleteBlogModal = ({handleDelete, type, title}) => {
    return (
        <div>
            <input type="checkbox" id="delete-blog-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-xl text-warning">Alert!</h3>
                    <p className="py-4">Are you sure you want to delete this {type}? <br/> <span className='text-xl font-bold'>{ title}</span></p>
                    <div className="modal-action">
                        <label htmlFor="delete-blog-modal" className="btn">Cancel</label>
                        <button onClick={handleDelete} className="btn btn-error text-white">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteBlogModal