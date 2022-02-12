import React from 'react';
import H5 from 'components/Typography/Heading5';
import LeadText from 'components/Typography/LeadText';
import Icon from 'components/Icon/Icon';

export default function IndexFooter() {
    return (
        <>
            <footer className="relative  pb-6">
                <div className="container max-w-7xl mx-auto px-4">
                    {/* <hr className="my-2 border-gray-300" /> */}
                    <div className="flex flex-wrap items-center md:justify-between justify-center">
                        <div className="w-full md:w-4/12 px-4 mx-auto text-center">
                        {/* <svg class="text-primary-500 stroke-current mr-1" style={{display: "inline-block" , color : "rgba(3,169,244,var(--tw-text-opacity))"}} xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"
                            ><path d="M0 0h24v24H0z" stroke="none"></path><rect x="3" y="12" width="6" height="8" rx="1"></rect>
                            <rect x="9" y="8" width="6" height="12" rx="1"></rect><rect x="15" y="4" width="6" height="16" rx="1"></rect><path d="M4 20h14"></path></svg>
                            <div className="text-white stroke-current mr-1 font-bold ">
                                Copyright © {new Date().getFullYear()} Refi
                            </div> */}
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}
