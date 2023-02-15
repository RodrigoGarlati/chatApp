import Image from "next/image"
import { homeLayoutImg } from "@/utils/images"

export default function HomeLayout(){
    return (
        <div className="me-5">
                <h1 className="display-4 text-warning border border-bottom-0 border-end-0 border-warning p-4">Welcome to ChatApp</h1>
                <div className="p-3">
                    <img
                        className="rounded-pill border border-warning"
                        src={homeLayoutImg}
                        width={600}
                        height={300}
                    />
                </div>
        </div>
    )
}