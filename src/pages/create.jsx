import React, { useState } from 'react'

import { storage } from '../firebase/firebase.utils';
export const Create = () => {
    const [file, setfile] = useState(null);

    const filehandler = (e) => {
        setfile(e.target.files[0]);
    }

    const filesubmit = (e) => {
        e.preventDefault();
        const ref = storage.ref();
        const image = ref.child(`events/${file.name}`).put(file);

        image.then(snapshot => {
            return snapshot.ref.getDownloadURL()
        }).then(url => {
            console.log(url);

        }).catch(error => {
            console.log(error)
        })
    }

    return (
        <div>
            <form onSubmit={(e)=>filesubmit(e)}>
                <input onChange={(e)=>filehandler(e)} type="file" />
                <button type='submit'>Upload</button>
            </form>
            
            
        </div>
    )
}

export default Create;