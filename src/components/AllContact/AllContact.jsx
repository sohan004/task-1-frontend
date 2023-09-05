import React, { useEffect, useState } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const AllContact = () => {
    const [loading, setLoading] = useState(true);
    const [contacts, setContacts] = useState([]);
    const [reFatch, setReFatch] = useState(1);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        setLoading(true);
        fetch('http://localhost:5000/contact')
            .then(res => res.json())
            .then(data => {
                setContacts(data);
                setLoading(false);
            })
    }, [reFatch]);

    const searchFunctino = () => {
        setLoading(true);
        fetch(`http://localhost:5000/contact/${search}`)
            .then(res => res.json())
            .then(data => {
                setContacts(data);
                setLoading(false);
            })
    }

    const submitHandler = (e) => {
        e.preventDefault();
        searchFunctino();
    }

    const deleteFunctino = (id) => {
        fetch(`http://localhost:5000/contact/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                setReFatch(reFatch + 1)
            })
    }

    return (
        <div>
            <fieldset className="w-full space-y-1 dark:text-gray-100 mt-5 flex justify-center">
                <form onSubmit={submitHandler} className="relative border px-7 rounded">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                        <button onClick={searchFunctino} type="button" title="search" className="p-1 focus:outline-none focus:ring">
                            <svg fill="currentColor" viewBox="0 0 512 512" className="w-4 h-4 dark:text-gray-100">
                                <path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z"></path>
                            </svg>
                        </button>
                    </span>
                    <input value={search} onChange={e => setSearch(e.target.value)} type="search" name="Search" placeholder="Search by name.." className="w-32 py-2 pl-10 text-sm rounded-md sm:w-auto focus:outline-none dark:bg-gray-800 dark:text-gray-100 focus:dark:bg-gray-900 focus:dark:border-violet-400" />
                </form>
            </fieldset>


            {loading && <FaSpinner className='text-3xl mt-7 text-center mx-auto animate-spin'></FaSpinner>}


            {!loading && <div className="overflow-x-auto mt-5">
                {contacts.length > 0 && <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Categories</th>
                            <th>update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {contacts.map((contact, index) => <tr key={contact?._id}>
                            <th>{index + 1}</th>
                            <td>{contact?.name}</td>
                            <td>{contact?.email}</td>
                            <td>{contact?.categories}</td>
                            <td><button onClick={() => navigate(`/update/${contact._id}`)} className="btn btn-success">update</button></td>
                            <td><button onClick={() => deleteFunctino(contact._id)} className="btn btn-error">Delete</button></td>
                        </tr>)}

                    </tbody>
                </table>}
                {contacts.length === 0 && <h1 className="text-center text-2xl font-bold">No Contact Found</h1>}
            </div>}
        </div>
    );
};

export default AllContact;