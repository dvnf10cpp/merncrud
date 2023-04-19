import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'bulma/css/bulma.css';

export const StudentList = () => {
    const [students, setStudent] = useState([]);

    
    useEffect(() => {
        getStudents();
        document.title = "List Students";
    }, []);

    const getStudents = async () => {
        const response = await axios.get('http://localhost:5000/students');
        setStudent(response.data);
    }

    const deleteStudent = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/students/${id}`)
            getStudents();
        } catch(error){
            console.log(`Error: ${error}`);
        }
    }

    return (
        <div className="columns is-centered">
            <div className="column is-three-quarters">
                <h1>List Students</h1>
                <hr />
                <table className='table is-striped is-fullwidth'>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>NIM</th>
                            <th>Email</th>
                            <th>Major</th>
                            <th>University</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student, index) => (
                        <tr key={student.id}>
                            <td>{index + 1}</td>
                            <td>{student.name}</td>
                            <td>{student.nim}</td>
                            <td>{student.email}</td>
                            <td>{student.major}</td>
                            <td>
                                <figure className='image is-48x48'>
                                    <img src={`/img/uni_logos/${student.university}.png`} alt="universitas"/>
                                </figure>
                            </td>
                            <td>
                                <Link to={`/update/${student.id}`} className='button is-small is-success' style={{textDecoration: 'none'}}>Update</Link>
                                <button onClick={() => deleteStudent(student.id)} className='button is-small is-danger'>Delete</button>
                            </td>
                        </tr>))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
