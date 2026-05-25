import Image from 'next/image'
import React from 'react'

const Record = () => {
  return (
    <>
     <header className="fixed left-0 right-0 z-50 top-4">
            <nav className="mx-auto max-w-4xl px-4">
              <div className="bg-black shadow-2xl rounded-xl px-4 py-4">
                <div className="flex items-center justify-between text-white">
                  <div className="text-white">
                    <Image
                      draggable={false}
                      src={"/svg/logo3.svg"}
                      alt="logo"
                      width={120}
                      height={120}
                      // onClick={() => handleRoute("/")}
                      className="text-white"
                      />
                  </div>
                  {/* <GitHubIcon className="w-7 h-7" /> */}
                </div>
              </div>
            </nav>
          </header>
          <main>
            <div>
              Recording preview
            </div>
          </main>
                      </>
  )
}

export default Record 