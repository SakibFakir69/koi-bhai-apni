

import React from 'react'

function SearchContacts() {
  return (
    <div className='p-3'>

        <section>
            <input type='text' placeholder='Enter your number' className='p-4 border rounded-2xl'/>

        </section>

        <section className='flex flex-col p-2 gap-y-8 m-2 mt-4' >

            <div className='border border-stone-200'>
                <img className='h-10 w-10 border rounded-full'/>
                <h2>sakib fakir</h2>

            </div>
              <div className='border border-stone-200'>
                <img className='h-10 w-10 border rounded-full'/>
                <h2>sakib fakir</h2>

            </div>
              <div className='border border-stone-200'>
                <img className='h-10 w-10 border rounded-full'/>
                <h2>sakib fakir</h2>

            </div>
              <div className='border border-stone-200'>
                <img className='h-10 w-10 border rounded-full'/>
                <h2>sakib fakir</h2>

            </div>

        </section>

    </div>
  )
}

export default SearchContacts