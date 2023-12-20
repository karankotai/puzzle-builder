import axios from 'axios';
import { ChangeEvent, useState } from 'react';
import { ImSpinner2 } from 'react-icons/im';
import { IoMdHome } from 'react-icons/io'
import { Link } from 'react-router-dom'
import SuccessAlert from './SuccessAlert';
import ErrorAlert from './ErrorAlert';

interface Problem {
    title: string;
    desc: string;
    hints: string[];
    options: {
        [key: string]: string[];
    };
    ans: {
        [key: string]: string;
    }[];
}

const AddPuzzle = () => {
    const createEmptyObj = () => {
        return { title: "", desc: "", hints: [""], options: {}, ans: [] }
    }
    const [cols, setCols] = useState(["", "", ""])
    const [rows, setRows] = useState([["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""]])
    const [formObj, setFormObj] = useState<Problem>(createEmptyObj())
    const [errorObj, setErrorObj] = useState({ title: false, desc: false, hints: [false], table: false })
    const validate = (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        if (formObj.title.length == 0) {
            setErrorObj({ ...errorObj, title: true })
            return;
        }
        if (formObj.desc.length == 0) {
            setErrorObj({ ...errorObj, desc: true })
            return;
        }
        let flag = false
        formObj.hints.map((el, i) => {
            if (el.length == 0) {
                errorObj.hints[i] = true
                setErrorObj({ ...errorObj })
                flag = true;
                return;
            }
        })
        if (flag) return;
        flag = false;
        cols.map(el => {
            if (el.length == 0) {
                setErrorObj({ ...errorObj, table: true })
            }
        })
        if (flag) return;
        flag = false;
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 3; j++) {
                if (rows[i][j].length == 0) {
                    setErrorObj({ ...errorObj, table: true })
                    flag = true
                    break;
                }
            }
            if (flag) return;
        }
        makeOptionAns(e)
    }
    const makeOptionAns = (e: { preventDefault: () => void; }) => {
        setErrorObj({ title: false, desc: false, hints: [false], table: false })
        const options = {
            [cols[0]]: rows.map((ele) => {
                return ele[0]
            }).sort(() => 0.5 - Math.random()),
            [cols[1]]: rows.map((ele) => {
                return ele[1]
            }).sort(() => 0.5 - Math.random()),
            [cols[2]]: rows.map((ele) => {
                return ele[2]
            }).sort(() => 0.5 - Math.random()),
        }
        const ans = rows.map((ele) => {
            return { [cols[0]]: ele[0], [cols[1]]: ele[1], [cols[2]]: ele[2] }
        })
        console.log(options, ans)
        setFormObj({ ...formObj, options, ans })
        handleSubmit(e, options, ans)
    }
    const [loading, setLoading] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    const [showError, setShowError] = useState(false)
    const handleSubmit = async (e: { preventDefault: () => void; }, options: { [key: string]: string[] }, ans: { [key: string]: string }[]) => {
        setLoading(true)
        try {
            const response = await axios.post('https://nice-tan-butterfly-sari.cyclic.app/puzzle/add', { ...formObj, options, ans })
            if (response.status === 200) {
                setLoading(false)
                setShowAlert(true)
                handleReset(e)
            } else {
                console.log(response.data)
                setLoading(false)
                setShowError(true)
            }
        } catch (error) {
            console.log(error)
            setLoading(false)
            setShowError(true)
        }
    }
    const handleInput = (e: { target: { name: string | (string | number)[]; value: string; }; }) => {
        setErrorObj({ title: false, desc: false, hints: [false], table: false })
        if (e.target.name === 'title' || e.target.name === 'desc') {
            setFormObj({ ...formObj, [e.target.name]: e.target.value.trim() })
        } else if (e.target.name.includes('hint')) {
            const temp = formObj.hints
            temp[Number(e.target.name[4])] = e.target.value.trim()
            setFormObj({ ...formObj, hints: [...temp] })
        }
    }
    const handleAddHint = (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        const hints = formObj.hints
        if (!hints[hints.length - 1] && hints[hints.length - 1] !== "") console.log("Please Fill the previous hint first!")
        else {
            setFormObj({ ...formObj, hints: [...formObj.hints, ""] })
            setErrorObj({ ...errorObj, hints: [...errorObj.hints, false] })
        }
    }
    const handleReset = (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        setFormObj(createEmptyObj())
        setCols(["", "", ""])
        setRows([["", "", ""], ["", "", ""], ["", "", ""]])
    }
    const handleTableChange = (e: ChangeEvent<HTMLInputElement>, i: number = 0, j: number = 0) => {
        if (e.target.name.includes("col")) {
            cols[Number(e.target.name[Number(e.target.name.length - 1)])] = e.target.value
            setCols([...cols])
        } else {
            rows[i][j] = e.target.value.trim()
            setRows([...rows])
        }
    }

    return (
        <div className='bg-cyan-100 min-h-screen pb-5'>
            <Link to='/'><IoMdHome className="fixed shadow-lg left-[2%] border border-black top-[3%] z-20 bg-white rounded-md" size='2.8em' color='#91ccd1' /></Link>
            <form onSubmit={validate}>
                <div className='w-[75%] lg:w-[50%] m-auto pt-5 flex flex-col gap-3'>
                    <div className='border-t-cyan-500 border-t-8 rounded-xl bg-white p-8 w-full border-b'>
                        <h2 className='font-bold text-3xl pb-2'>Publish Your Own puzzle</h2>
                        <p>Enter the puzzle details to add puzzle to the site</p>
                    </div>
                    <div className='bg-white flex flex-col gap-5 rounded-xl p-6'>
                        <label className='font-bold'>Enter Puzzle Title <span className='text-red-500'>*</span></label>
                        <input value={formObj.title} onChange={handleInput} name='title' type="text" placeholder='Enter Title Here' className='border-b active:outline-0 p-2 border-black w-1/2' required />
                        {errorObj["title"] && <p className='text-red-500 text-sm text-right'>**Please Enter Title for the Puzzle**</p>}
                    </div>
                    <div className='bg-white flex flex-col gap-5 rounded-xl p-6'>
                        <label className='font-bold'>Enter Puzzle Description <span className='text-red-500'>*</span></label>
                        <textarea value={formObj.desc} onChange={handleInput} name='desc' placeholder='Enter Description Here' className='border-b border-l active:outline-0 px-3 border-black w-1/2' required ></textarea>
                        {errorObj["desc"] && <p className='text-red-500 text-sm text-right'>**Please Enter Description for the Puzzle**</p>}
                    </div>
                    <div className='bg-white flex flex-col gap-5 rounded-xl p-6'>
                        <label className='font-bold'>Enter Hints <span className='text-red-500'>*</span></label>
                        {formObj.hints.map((ele, i, row) => {
                            return <div>
                                <div className='flex items-center gap-2'>
                                    <input value={ele} onChange={handleInput} name={`hint${i}`} type="text" placeholder={`Hint ${i + 1}`} className='border-b active:outline-0 p-2 border-black w-1/2' required />
                                    {i + 1 == row.length && <button className='bg-white h-fit disabled:cursor-not-allowed hover:bg-slate-800 hover:text-white py-0.5 rounded-sm px-2.5 text-lg font-bold border border-black' disabled={ele == ""} onClick={handleAddHint}>+</button>}
                                </div>
                                {errorObj["hints"][i] && <p className='text-red-500 text-sm text-right'>**Hint cannot be left empty**</p>}
                            </div>
                        })}
                    </div>
                    <div className='bg-white flex flex-col gap-5 rounded-xl p-6'>
                        <label className='font-bold'>Enter Titles and Answer of the Puzzle<span className='text-red-500'>*</span></label>
                        <table className='border-slate-400 border-2'>
                            <thead>
                                <tr>
                                    <th></th>
                                    {cols.map((ele, i) => {
                                        return <th className='border border-black text-center'>
                                            <input type='text' value={ele} required onChange={handleTableChange} name={`col${i}`} placeholder={`Title ${i + 1}`} className='text-center' />
                                        </th>
                                    })}
                                </tr>
                            </thead>
                            <tbody>
                                {rows.map((ele, i) => {
                                    return <tr>
                                        <td className='p-1 px-2 text-center border border-slate-500 font-bold'>{i + 1}</td>
                                        <td className='text-center border border-slate-500'>
                                            <input type="text" className='text-center text-[0.95rem] w-full' required value={ele[0]} onChange={(e) => handleTableChange(e, i, 0)} placeholder='Correct Answer' />
                                        </td>
                                        <td className='text-center border border-slate-500'>
                                            <input type="text" className='text-center text-[0.95rem] w-full' required placeholder='Correct Answer' value={ele[1]} onChange={(e) => handleTableChange(e, i, 1)} />
                                        </td>
                                        <td className='text-center border border-slate-500'>
                                            <input type="text" className='text-center text-[0.95rem] w-full' required placeholder='Correct Answer' value={ele[2]} onChange={(e) => handleTableChange(e, i, 2)} />
                                        </td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                        {errorObj["table"] && <p className='text-red-500 text-sm text-right'>**Please fill the full table**</p>}
                    </div>
                    <div className='bg-white flex flex-col items-center rounded-xl p-6'>
                        <button className='bg-cyan-500 text-center font-bold w-1/2 text-white border border-black' onClick={validate} disabled={loading}>{loading ? <ImSpinner2 className="animate-spin m-auto" color='#91ccd1' size='1.5em' /> : "Submit"}</button>
                    </div>
                    <button className='bg-transparent underline ml-auto' onClick={handleReset}>Clear Form</button>
                </div>
            </form>
            {showAlert && <SuccessAlert showAlert={showAlert} setShowAlert={setShowAlert} />}
            {showError && <ErrorAlert showError={showError} setShowError={setShowError} />}
        </div >
    )
}

export default AddPuzzle
