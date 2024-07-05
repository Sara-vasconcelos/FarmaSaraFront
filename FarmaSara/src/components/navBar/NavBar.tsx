import React from 'react'


function Navbar() {
 
  

  return (
    <>
     <div className='w-full bg-[#233d4d] text-white flex justify-center py-4 color-navbar'>
          <div className="container flex justify-between text-lg">
            <div className='text-2xl font-bold uppercase'>FarmáSara</div>

            <div className='flex gap-4'>
            <div className='hover:underline'>Home</div>
              <div className='hover:underline'>Categorias</div>
              <div className='hover:underline'>Sair</div>
            </div>
          </div>
        </div>
    </>
  )
}

export default Navbar