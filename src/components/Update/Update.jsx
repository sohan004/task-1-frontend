import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import Select from 'react-select';
import { toast } from 'react-toastify';

const options = [
    { value: 'Family', label: 'Family' },
    { value: 'Friends', label: 'Friends' },
    { value: 'Office', label: 'Office' },
    { value: 'College', label: 'College' },
];

// toast.error('🦄 Wow so easy!', {
//     position: "top-center",
//     autoClose: 5000,
//     hideProgressBar: false,
//     closeOnClick: true,
//     pauseOnHover: true,
//     draggable: true,
//     progress: undefined,
//     theme: "colored",
//     });


const Update = () => {

    const contactDetails = useLoaderData()
    console.log(contactDetails);




    const [categories, setCategories] = useState(contactDetails?.categories ? { value: contactDetails.categories, label: contactDetails.categories } : null);
    const [name, setName] = useState(contactDetails?.name);
    const [phone, setPhone] = useState(contactDetails?.phone);
    const [email, setEmail] = useState(contactDetails?.email);
    const [loading, setLoading] = useState(false);


    const handleAddContact = (e) => {
        setLoading(true);
        if (!name || !phone || !email || !categories) {
            setLoading(false);
            return toast.error('Please fill all the fields', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }

        fetch(`http://localhost:5000/contact/${contactDetails._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, phone, email, categories: categories.value })
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    toast.success('contact update successfully', {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    })

                }
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
                toast.error('somthing want wrong', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            })
    }


    return (
        <div className='h-[100vh] flex justify-center items-center bg-blue-200'>
            <div className="w-full">
                <h2 className="text-center text-blue-400 px-4 font-bold text-2xl uppercase mb-10">Update your contact</h2>
                <div className="bg-white p-10 rounded-lg shadow md:w-3/4 mx-auto lg:w-1/2">
                    <div action="">
                        <div className="mb-5">
                            <label htmlFor="name" className="block mb-2 font-bold text-gray-600">Name</label>
                            <input value={name} onChange={e => setName(e.target.value)} type="text" id="name" name="name" placeholder="Put in your fullname." className="border border-gray-300 shadow p-3 w-full rounded mb-" />
                        </div>

                        <div className="mb-5">
                            <label htmlFor="name" className="block mb-2 font-bold text-gray-600">Phone Number</label>
                            <input value={phone} onChange={e => setPhone(e.target.value)} type="number" id="name" name="name" placeholder="Put in your Phone Number." className="border border-gray-300 shadow p-3 w-full rounded mb-" />
                        </div>

                        <div className="mb-5">
                            <label htmlFor="name" className="block mb-2 font-bold text-gray-600">Email</label>
                            <input value={email} onChange={e => setEmail(e.target.value)} type="email" id="name" name="name" placeholder="Put in your Email." className="border border-gray-300 shadow p-3 w-full rounded mb-" />
                        </div>

                        <div className="mb-5">
                            <label htmlFor="name" className="block mb-2 font-bold text-gray-600">Categories</label>
                            <Select
                                value={categories}
                                onChange={setCategories}
                                options={options}
                            />
                        </div>


                        <button disabled={loading} onClick={handleAddContact} className="block w-full bg-blue-500 text-white font-bold p-4 rounded-lg">update Contact</button>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default Update;