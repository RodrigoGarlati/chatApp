import Image from "next/image"
import { homeLayoutImg } from "@/utils/images"

export default function HomeLayout(){
    return (
        <div>
                <h1>Welcome to ChatApp</h1>
                <div>
                    <img
                        src={homeLayoutImg}
                        width={600}
                        height={300}
                    />
                </div>
        </div>
    )
}