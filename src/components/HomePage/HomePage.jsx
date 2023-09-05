import React from 'react';

const HomePage = () => {
    return (
        <div>
            <div className="bg-gray-50 cs-font">
                <div id="wrapper" className="grid grid-cols-1 xl:grid-cols-2 xl:h-screen">
                    <div id="col-1" className="bg-blue-900 px-12 pt-32 pb-40 md:px-32 xl:py-64 xl:px-32">
                        <h1 className="text-blue-500 font-extrabold text-4xl md:text-6xl">The <br />
                            Task 1<br />
                            Project</h1>
                        <p className="text-white text-normal md:text-3xl pt-3 md:pt-6 font-medium">Implement a Contact Management System</p>
                    </div>
                    <div id="col-2" className="px-3 md:px-20 xl:py-64 xl:px-12">

                        <div id="cards" className="rounded-lg flex border py-5 px-6 md:py-8 md:px-16 -mt-6 bg-white xl:-ml-24 xl:pl-8 xl:rounded-xl">
                            <div id="circle" className="w-8 h-8 bg-blue-500 md:w-16 md:h-16 rounded-full"></div>
                            <p className="pl-4 md:pl-12 text-base pt-1 font-semibold md:text-2xl md:pt-4">“It’s truly awesome, man!”</p>
                        </div>

                        <div id="cards" className="rounded-lg flex border py-5 px-6 md:py-8 md:px-16 mt-6 md:mt-12 bg-white xl:pl-8 xl:rounded-xl">
                            <div id="circle" className="w-8 h-8 bg-blue-500 md:w-16 md:h-16 rounded-full"></div>
                            <p className="pl-4 md:pl-12 text-base pt-1 font-semibold md:text-2xl md:pt-4">“It’s truly awesome, man!”</p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;