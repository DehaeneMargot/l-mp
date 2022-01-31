import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useAR } from "../utils/useAR";

const Footer = (props: any) => {


    return (
        <footer id="main">
            <div className="space-y-6 max-w-8xl mx-auto p-8 relative h-full">
      <div className="grid md:grid-cols-3 grid-cols-1 gap-8">
        <div>
          <h1 className="font-semibold text-xl  dark:text-orange-500">Connect with us!</h1>
          <h2 className="mt-1 dark:text-white">
            Ask us questions through our social media or share your pictures
            with us.
          </h2>
          <div className="flex space-x-4 mt-4 shad">
            <a
              href="https://www.instagram.com/"
              target="blank"
              className="bg-white rounded-full p-3 shadow-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                />
              </svg>
            </a>
            <a
              href="https://www.facebook.com/"
              target="blank"
              className="bg-white rounded-full p-3 shadow-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"
                />
              </svg>
            </a>
            <a
              href="https://www.twitter.com/"
              target="blank"
              className="bg-white rounded-full p-3 shadow-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
                />
              </svg>
            </a>
          </div>
        </div>
        <div className="grid grid-cols-2">
          <div className="flex flex-col dark:text-white">
            <h1 className="font-semibold pb-2 text-orange-500">Explore</h1>
            <a href="">Home</a>
            <a href="">About us</a>
            <a href="">Team</a>
            <a href="">Careers</a>
          </div>
          <div className="flex flex-col dark:text-white">
            <h1 className="font-semibold pb-2 text-orange-500">Legal</h1>
            <a href="">Terms & conditions</a>
            <a href="">Privacy Policy</a>
            <a href="">Terms of use</a>
            <a href="">Contact</a>
          </div>
        </div>
        <div>
          <h1 className="font-semibold pb-2 text-orange-500">Newsletter</h1>
          <p className="dark:text-white">Subscribe to the newsletter for weekly news and offers.</p>
          <div className="flex items-center justify-center space-x-2 mt-2">
            <input type="text" placeholder={"Email Address"} className="text-black relative bg-white dark:bg-zinc-700 w-full h-10 rounded-md p-3 border dark:border-zinc-800 dark:hover:border-orange-500 border-neutral-100 focus:outline-none hover:border hover:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-40"/>
            <button className="h-10 w-12 dark:bg-white bg-zinc-900 rounded-md justify-center items-center flex">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 stroke-white dark:stroke-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20" />
              </svg>
            </button>
          </div>

        </div>
      </div>
    </div>
    <div className="bg-neutral-200 dark:bg-zinc-1000">
      <div className="max-w-8xl mx-auto p-4 relative h-auto" > 
        <h1 className="text-sm text-center font-semibold dark:text-white">
          Copyright © 2022 LÄMP. All Rights Reserved. Made with L♥VE.
        </h1>
      </div>

      </div>
    </footer>
    )
        

};

export default Footer;