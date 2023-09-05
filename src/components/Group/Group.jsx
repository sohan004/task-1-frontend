import React, { useEffect, useState } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { toast } from 'react-toastify';

const options = [
    { value: 'Family', label: 'Family' },
    { value: 'Friends', label: 'Friends' },
    { value: 'Office', label: 'Office' },
    { value: 'College', label: 'College' },
];

const Group = () => {
    const [categories, setCategories] = useState({ value: 'Friends', label: 'Friends' });
    const [loading, setLoading] = useState(true);
    const [contacts, setContacts] = useState([]);
    const navigate = useNavigate();
    const [reFatch, setReFatch] = useState(1);

    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:5000/contact-group/${categories.value}`)
            .then(res => res.json())
            .then(data => {
                setContacts(data);
                setLoading(false);
            })
    }, [categories, reFatch]);
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
            <Select
                className='mt-5 max-w-[150px] mx-auto'
                value={categories}
                onChange={setCategories}
                options={options}
            />

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

export default Group;