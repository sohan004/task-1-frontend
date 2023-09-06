import React, { useContext, useState } from 'react';
import Select from 'react-select';
import { AuthContext } from '../AuthProvider/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';

const ContactCard = ({ c, reFatch, setReFatch }) => {
    const { user, noti, notiLoad, setNotiLoad } = useContext(AuthContext)
    const options2 = [
        { value: 'Public', label: 'Public' },
        { value: 'Only Me', label: 'Only Me' },
    ];

    const navigate = useNavigate();

    const [accessType, setAccessType] = useState({ value: c.accessType, label: c.accessType });
    const cngAccessType = (e) => {
        if (!user) {
            navigate('/login')
        }
        fetch(`http://localhost:5000/contact/${c._id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ accessType: e.value })
        })
            .then(res => res.json())
            .then(data => {

                fetch('http://localhost:5000/notification', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email: user.email, message: 'Contact access changed', read: false, created_at: new Date(), path: '/my-contact' })
                })
                    .then(res => res.json())
                    .then(data => {
                        setNotiLoad(notiLoad + 1)
                    })
            })
    }

    const deleteContact = () => {
        if (!user) {
            navigate('/login')
        }
        fetch(`http://localhost:5000/contact/${c._id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        })
            .then(res => res.json())
            .then(data => {
                fetch('http://localhost:5000/notification', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email: user.email, message: 'Your contact has deleted', read: false, created_at: new Date(), path: '/my-contact' })
                })
                    .then(res => res.json())
                    .then(data => {
                        setNotiLoad(notiLoad + 1)
                    })
                setReFatch(reFatch + 1)
            })
    }

    const permissionDelete = (p) => {
        if (!user) {
            navigate('/login')
        }
        const newPermission = c.permission.filter(per => per != p)
        fetch(`http://localhost:5000/contact/${c._id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ permission: newPermission })
        })
            .then(res => res.json())
            .then(data => {
                setReFatch(reFatch + 1)
                fetch('http://localhost:5000/notification', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email: p, message: `${c?.name} contact permission remove`, read: false, created_at: new Date(), path: '/my-contact' })
                })
                    .then(res => res.json())
                    .then(data => {
                        setNotiLoad(notiLoad + 1)
                    })
            })
    }


    return (
        <>
            <div className="w-full relative p-8 border sm:flex sm:space-x-6 dark:bg-gray-900 bg-blue-100 dark:text-gray-100">
                <div className="flex flex-col ">
                    <div>
                        <h2 className="text-2xl font-semibold mb-5">{c.name}</h2>
                    </div>
                    <div className="space-y-1">
                        <span className="flex items-center space-x-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" aria-label="Email address" className="w-4 h-4">
                                <path fill="currentColor" d="M274.6,25.623a32.006,32.006,0,0,0-37.2,0L16,183.766V496H496V183.766ZM464,402.693,339.97,322.96,464,226.492ZM256,51.662,454.429,193.4,311.434,304.615,256,268.979l-55.434,35.636L57.571,193.4ZM48,226.492,172.03,322.96,48,402.693ZM464,464H48V440.735L256,307.021,464,440.735Z"></path>
                            </svg>
                            <span className="dark:text-gray-400">{c.email}</span>
                        </span>
                        <span className="flex items-center space-x-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" aria-label="Phonenumber" className="w-4 h-4">
                                <path fill="currentColor" d="M449.366,89.648l-.685-.428L362.088,46.559,268.625,171.176l43,57.337a88.529,88.529,0,0,1-83.115,83.114l-57.336-43L46.558,362.088l42.306,85.869.356.725.429.684a25.085,25.085,0,0,0,21.393,11.857h22.344A327.836,327.836,0,0,0,461.222,133.386V111.041A25.084,25.084,0,0,0,449.366,89.648Zm-20.144,43.738c0,163.125-132.712,295.837-295.836,295.837h-18.08L87,371.76l84.18-63.135,46.867,35.149h5.333a120.535,120.535,0,0,0,120.4-120.4v-5.333l-35.149-46.866L371.759,87l57.463,28.311Z"></path>
                            </svg>
                            <span className="dark:text-gray-400">{c.phone}</span>
                        </span>

                    </div>
                    <p className='mt-5 font-semibold mb-1'>Access type</p>
                    <div className="mb-5">
                        <Select
                            value={accessType}
                            onChange={(e) => { setAccessType(e); cngAccessType(e) }}
                            options={options2}
                        />
                    </div>

                    <div>
                        <p className='mt-5 font-semibold mb-3'>Edit Permissino: </p>
                        {c.permission.map((p, i) => <p key={i} className='mb-1 p-1 bg-slate-300'>{p} <button onClick={() => permissionDelete(p)} className="btn btn-sm btn-error">delete</button></p>)}

                    </div>
                </div>
                <div className='absolute flex gap-2 bottom-2 right-2'>
                    {/* <button className="btn btn-success btn-sm">Share Contact</button> */}
                    <Link to={`/update/${c._id}`}> <button className="btn btn-primary btn-sm">Edit</button></Link>
                    <button onClick={deleteContact} className="btn btn-error btn-sm">Delete</button>
                </div>
            </div>
        </>
    );
};

export default ContactCard;