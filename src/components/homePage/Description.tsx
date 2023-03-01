import { useEffect, useState } from "react"
import { collection, getDocs } from "firebase/firestore"
import { db } from "../../lib/init-firebase"

interface Response {
    data: any;
    id: string
}

export const Description = () => {
    const [details, setDetails] = useState<any[]>([])

    useEffect(() => {
        getDetails()
    }, [])

    function getDetails() {
        const detaileCollectionRef = collection(db, 'details')
        getDocs(detaileCollectionRef).then(response => {
            const dets: Response[] = response.docs.map(d => ({
                data: d.data(),
                id: d.id
            }))
            setDetails(dets)
        })
            .catch(error => console.log(error.message))
    }
    return (
        <>
            <h1>Hoooi</h1>
            {details.map(dts =>
                <div>
                    <p key={dts.id}> Name: {dts.data.firstName} {dts.data.lastName}</p>
                    <p>Age: {dts.data.age}</p>
                </div>
            )}
        </>
    )
}