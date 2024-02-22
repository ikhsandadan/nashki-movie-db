"use client";
import React, { useState, useContext, useEffect } from 'react';

import UserContext from '../context/UserContext';
import defaultPicture from '../../assets/profile.png';

const Profile = () => {
    const { profile } = useContext(UserContext);
    const [userData, setUserData] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    useEffect(() => {
        if (profile !== undefined) {
            setUserData({
                picture: profile?.picture || defaultPicture,
                firstName: profile?.givenName || '',
                middleName: profile?.middleName || '',
                lastName: profile?.familyName || '',
                nickName: profile?.nickname || '',
                birthDate: profile?.birthdate || '',
                gender: profile?.gender || '',
                email: profile?.email || '',
                phone: profile?.phoneNumber || '', 
                address: profile?.streetAddress || '', 
                postalCode: profile?.postalCode || '',
                city: profile?.locality || '', 
                country: profile?.country || ''
            });
        }
    }, [profile])

    return (
        <>
        <div className="text-white text-6xl text-center font-nsans-bold mt-20 mb-16">Profile</div>
        <div className="container mx-auto mb-10">
            <div className="grid grid-cols-6">
                <div className="grid relative justify-self-center justify-center col-span-2">
                        <div className="flex text-white text-2xl border-2 rounded-full size-60 relative overflow-hidden justify-self-center">
                            <img src={userData && userData?.picture} alt={userData?.firstName} className="absolute inset-0 w-full h-full object-cover justify-self-center" />
                        </div>
                        <div className="absolute top-72 text-white text-2xl mt-0 justify-self-center">{userData?.nickName}</div>
                </div>
                <div className="space-y-12 col-span-3">
                    <div className="text-white text-2xl font-semibold">Personal Information</div>
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-2">
                        <label htmlFor="first-name" className="block text-base font-medium leading-6 text-white">
                            First name
                        </label>
                        <div className="mt-2">
                            <input
                            type="text"
                            name="first-name"
                            id="first-name"
                            autoComplete="given-name"
                            value={userData?.firstName}
                            onChange={handleChange}
                            className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-200 sm:text-sm sm:leading-6"
                            />
                        </div>
                        </div>

                        <div className="sm:col-span-2">
                        <label htmlFor="first-name" className="block text-base font-medium leading-6 text-white">
                            Middle name
                        </label>
                        <div className="mt-2">
                            <input
                            type="text"
                            name="middle-name"
                            id="middle-name"
                            autoComplete="middle-name"
                            value={userData?.middleName}
                            onChange={handleChange}
                            className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-200 sm:text-sm sm:leading-6"
                            />
                        </div>
                        </div>

                        <div className="sm:col-span-2">
                        <label htmlFor="last-name" className="block text-base font-medium leading-6 text-white">
                            Last name
                        </label>
                        <div className="mt-2">
                            <input
                            type="text"
                            name="last-name"
                            id="last-name"
                            autoComplete="family-name"
                            value={userData?.lastName}
                            onChange={handleChange}
                            className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-200 sm:text-sm sm:leading-6"
                            />
                        </div>
                        </div>

                        <div className="sm:col-span-2">
                        <label htmlFor="email" className="block text-base font-medium leading-6 text-white">
                            Birthday
                        </label>
                        <div className="mt-2">
                            <input
                            id="Birthday"
                            name="Birthday"
                            type="date"
                            autoComplete="Birthday"
                            value={userData?.birthDate}
                            onChange={handleChange}
                            className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-200 sm:text-sm sm:leading-6"
                            />
                        </div>
                        </div>

                        <div className="sm:col-span-4">
                        <label htmlFor="email" className="block text-base font-medium leading-6 text-white">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            value={userData?.email}
                            onChange={handleChange}
                            className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-200 sm:text-sm sm:leading-6"
                            />
                        </div>
                        </div>

                        <div className="sm:col-span-3">
                        <label htmlFor="country" className="block text-base font-medium leading-6 text-white">
                            Country
                        </label>
                        <div className="mt-2">
                            <input
                            id="country"
                            name="country"
                            autoComplete="country-name"
                            value={userData?.country}
                            onChange={handleChange}
                            className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-gray-200 sm:max-w-xs sm:text-sm sm:leading-6"
                            />
                        </div>
                        </div>

                        <div className="col-span-full">
                        <label htmlFor="street-address" className="block text-base font-medium leading-6 text-white">
                            Street address
                        </label>
                        <div className="mt-2">
                            <input
                            type="text"
                            name="street-address"
                            id="street-address"
                            autoComplete="street-address"
                            value={userData?.address}
                            onChange={handleChange}
                            className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-200 sm:text-sm sm:leading-6"
                            />
                        </div>
                        </div>

                        <div className="sm:col-span-2 sm:col-start-1">
                        <label htmlFor="city" className="block text-base font-medium leading-6 text-white">
                            City
                        </label>
                        <div className="mt-2">
                            <input
                            type="text"
                            name="city"
                            id="city"
                            autoComplete="address-level2"
                            value={userData?.city}
                            onChange={handleChange}
                            className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-200 sm:text-sm sm:leading-6"
                            />
                        </div>
                        </div>

                        <div className="sm:col-span-2">
                        <label htmlFor="postal-code" className="block text-base font-medium leading-6 text-white">
                            ZIP / Postal code
                        </label>
                        <div className="mt-2">
                            <input
                            type="text"
                            name="postal-code"
                            id="postal-code"
                            autoComplete="postal-code"
                            value={userData?.postalCode}
                            onChange={handleChange}
                            className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-200 sm:text-sm sm:leading-6"
                            />
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Profile;