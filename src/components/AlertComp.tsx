import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { BsExclamationCircle } from "react-icons/bs";

interface AlertCompProps {
  status: number,
  showAlert: boolean,
  setShowAlert: React.Dispatch<React.SetStateAction<number>>
}
const AlertComp = ({status,showAlert,setShowAlert}:AlertCompProps) => {
  return (
    <Transition.Root show={showAlert} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={()=>setShowAlert(0)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className={`${status==1?'bg-red-400':status==2?'bg-green-300':status==3?'bg-yellow-300':'bg-white'} px-4 pb-4 pt-5 sm:p-6 sm:pb-4`}>
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 sm:mx-0 sm:h-10 sm:w-10">
                      <BsExclamationCircle className='h-6 w-6' aria-hidden="true" />
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title className="text-base font-semibold flex items-center justify-center leading-6 text-gray-900">
                        {status==1 ? "Wrong Solution 🥺. Try Again!!" : status==2 ? "Correct Ans 🥳. You are a Genius!!" : status==3 ? "Only one box can be marked TRUE in any row or column.":''}
                      </Dialog.Title>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-500 px-4 py-1 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className={`inline-flex w-full justify-center rounded-md bg-white hover:bg-black px-3 py-2 text-sm font-semibold text-black hover:text-white shadow-sm sm:ml-3 sm:w-auto`}
                    onClick={() => setShowAlert(0)}
                  >
                    OK
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default AlertComp
