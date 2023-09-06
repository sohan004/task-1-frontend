import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../AuthProvider/AuthProvider';

import ContactCard from './ContactCard';
import { FaSpinner } from 'react-icons/fa';

const MyContact = () => {
    const [loading, setLoading] = useState(true)
    const [contacts, setContacts] = useState([])
    const { user } = useContext(AuthContext)
    const [reFatch, setReFatch] = useState(1)
    useEffect(() => {
        if (!user) {
            return
        }
        setLoading(true)
        fetch(`http://localhost:5000/my-contact/${user?.email}`)
            .then(res => res.json())
            .then(data => setContacts(data))
            .finally(() => setLoading(false))

    }, [user, reFatch])
    return (

        <>
            {loading ? <FaSpinner className='text-3xl mt-7 text-center mx-auto animate-spin'></FaSpinner> :
                <>
                    {contacts.length == 0 ? <div className='text-center mx-auto mt-7 text-2xl'>No added no contact</div> :

                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-x-7 gap-y-4 mt-7'>
                            {contacts.map(c => <ContactCard key={c._id} setReFatch={setReFatch} reFatch={reFatch} c={c}></ContactCard>)}
                        </div>
                    }
                </>
            }
        </>

    );
};

export default MyContact;