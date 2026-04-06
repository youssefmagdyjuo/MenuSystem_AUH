import { BeatLoader } from "react-spinners";
export default function Loader() {
    return (
        <div className='loader center'>
            <BeatLoader
                color="#5AC6D8"
                size={30}
            />
        </div>
    )
}
