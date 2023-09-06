import React, { useContext, useEffect, useState } from 'react';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthProvider/AuthProvider';
import { FaSpinner } from 'react-icons/fa';

const Details = () => {
    const contactDetails = useLoaderData()
    const { user, noti, notiLoad, setNotiLoad } = useContext(AuthContext)
    const navigate = useNavigate();
    const [allPermission, setAllPermission] = useState([])
    const [permissionStatus, setPermissionStatus] = useState('no')
    const [reFatch, setReFatch] = useState(1)
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (contactDetails?.accessType == 'Only Me') {
            navigate('/')
        }
    }, [contactDetails])

    useEffect(() => {
        setLoading(true)
        fetch(`http://localhost:5000/all-permission`)
            .then(res => res.json())
            .then(data => {
                setAllPermission(data)
                setLoading(false)
            })
    }, [reFatch])

    useEffect(() => {
        const perfissionContact = allPermission.filter(p => p.contactId == contactDetails?._id)
        if (perfissionContact.length > 0) {
            const chk = perfissionContact.find(p => p.reqUser == user?.email)
            if (chk) {
                setPermissionStatus(chk.status ? 'Accepted' : 'Pending')
            }
            else {
                setPermissionStatus('no')
            }

        }
        if (perfissionContact.length == 0) {
            setPermissionStatus('no')
        }
    }, [allPermission, user])

    const handlePermission = () => {
        if (!user) {
            navigate('/login')
        }
        setLoading(true)
        fetch('http://localhost:5000/permission', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ contactOwner: contactDetails?.ownerEmail, contactName: contactDetails.name, contactId: contactDetails?._id, reqUser: user?.email, status: false, created_at: new Date() })

        })
            .then(res => res.json())
            .then(data => {
                setReFatch(reFatch + 1)
                fetch('http://localhost:5000/notification', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email: user.email, message: `${contactDetails.name} contact permission request send`, read: false, created_at: new Date(), path: '' })
                })
                    .then(res => res.json())
                    .then(data => {
                        setNotiLoad(notiLoad + 1)
                    })

                fetch('http://localhost:5000/notification', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email: contactDetails?.ownerEmail, message: `${contactDetails.name} contact permission request `, read: false, created_at: new Date(), path: '/permission-request' })
                })
                    .then(res => res.json())
                    .then(data => {
                        setNotiLoad(notiLoad + 1)
                    })
            })
    }


    const adminEmail = user?.email == contactDetails?.ownerEmail
    const permissionEmail = contactDetails.permission.map(p => p == user?.email)
    return (
        <div className='h-screen w-full bg-blue-100 flex justify-center items-center'>
            <div className=" p-8  dark:bg-gray-900 dark:text-gray-100 border space-y-10 bg-blue-200">
                <div className="flex flex-col space-y-4">
                    <div>
                        <h2 className="text-2xl font-semibold">{contactDetails?.name}</h2>
                    </div>
                    <div className="space-y-1">
                        <span className="flex items-center space-x-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" aria-label="Email address" className="w-4 h-4">
                                <path fill="currentColor" d="M274.6,25.623a32.006,32.006,0,0,0-37.2,0L16,183.766V496H496V183.766ZM464,402.693,339.97,322.96,464,226.492ZM256,51.662,454.429,193.4,311.434,304.615,256,268.979l-55.434,35.636L57.571,193.4ZM48,226.492,172.03,322.96,48,402.693ZM464,464H48V440.735L256,307.021,464,440.735Z"></path>
                            </svg>
                            <span className="dark:text-gray-400">{contactDetails?.email}</span>
                        </span>
                        <span className="flex items-center space-x-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" aria-label="Phonenumber" className="w-4 h-4">
                                <path fill="currentColor" d="M449.366,89.648l-.685-.428L362.088,46.559,268.625,171.176l43,57.337a88.529,88.529,0,0,1-83.115,83.114l-57.336-43L46.558,362.088l42.306,85.869.356.725.429.684a25.085,25.085,0,0,0,21.393,11.857h22.344A327.836,327.836,0,0,0,461.222,133.386V111.041A25.084,25.084,0,0,0,449.366,89.648Zm-20.144,43.738c0,163.125-132.712,295.837-295.836,295.837h-18.08L87,371.76l84.18-63.135,46.867,35.149h5.333a120.535,120.535,0,0,0,120.4-120.4v-5.333l-35.149-46.866L371.759,87l57.463,28.311Z"></path>
                            </svg>
                            <span className="dark:text-gray-400">{contactDetails?.phone}</span>
                        </span>
                    </div>
                </div>
                <>
                    {contactDetails?.ownerEmail == user?.email ? <Link to={`/update/${contactDetails._id}`}><button className="btn btn-primary btn-sm">Edit</button></Link> : <>
                        {loading ? <button className='btn btn-primary btn-sm'><FaSpinner className='animate-spin' /></button> : <>
                            {permissionStatus == 'no' && <button onClick={handlePermission} className="btn btn-primary btn-sm">send edit permission request</button>}
                            {permissionStatus == 'Pending' && <button className="btn btn-primary btn-sm">request pending</button>}
                            {permissionStatus == 'Accepted' && <Link to={`/update/${contactDetails._id}`}><button className="btn btn-primary btn-sm">Edit</button></Link>}
                        </>}

                    </>}
                </>

            </div>
        </div>
    );
};

export default Details;