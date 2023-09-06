import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../AuthProvider/AuthProvider';
import { FaSpinner } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const PerMission = () => {
    const [permission, setPermission] = useState([])
    const [loading, setLoading] = useState(true)
    const { user, noti, notiLoad, setNotiLoad } = useContext(AuthContext)
    const [reFatch, setReFatch] = useState(1)
    const navigate = useNavigate();
    useEffect(() => {
        setLoading(true)
        fetch(`http://localhost:5000/permission/${user?.email}`)
            .then(res => res.json())
            .then(data => {
                setPermission(data)
                setLoading(false)
            })
    }, [user, reFatch])

    const handleAccept = (p) => {
        if (!user) {
            navigate('/login')
        }
        setLoading(true)
        fetch(`http://localhost:5000/permission/${p._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(p)
        })
            .then(res => res.json())
            .then(data => {
                // setNotiLoad(notiLoad + 1)
                // setLoading(false)
                setReFatch(reFatch + 1)
                fetch('http://localhost:5000/notification', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email: p?.reqUser, message: `${p?.contactName} permission accepted`, read: false, created_at: new Date(), path: '' })
                })
                    .then(res => res.json())
                    .then(data => {
                        setNotiLoad(notiLoad + 1)
                    })
            })
    }

    const deletPermission = (p) => {
        if (!user) {
            navigate('/login')
        }
        setLoading(true)
        fetch(`http://localhost:5000/permission/${p._id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                setReFatch(reFatch + 1)
                fetch('http://localhost:5000/notification', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email: p?.reqUser, message: `${p?.contactName} permission rejected`, read: false, created_at: new Date(), path: '' })
                })
                    .then(res => res.json())
                    .then(data => {
                        setNotiLoad(notiLoad + 1)
                    })
            })
    }


    return (
        <div>
            {loading && <FaSpinner className='text-3xl mt-7 text-center mx-auto animate-spin'></FaSpinner>}


            {!loading && <div className="overflow-x-auto mt-5">
                {permission.length > 0 && <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>req user</th>
                            <th>req contact name</th>
                            <th>accept</th>
                            <th>delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {permission.map((p, index) => <tr key={p?._id}>
                            <th>{index + 1}</th>
                            <td>{p?.reqUser}</td>
                            <td>{p?.contactName}</td>
                            <td><button onClick={() => handleAccept(p)} className="btn btn-primary">accept</button></td>
                            <td><button onClick={() => deletPermission(p)} className="btn btn-error">delete</button></td>
                        </tr>)}

                    </tbody>
                </table>}
                {permission.length === 0 && <h1 className="text-center text-2xl font-bold">No permission request</h1>}
            </div>}
        </div>
    );
};

export default PerMission;