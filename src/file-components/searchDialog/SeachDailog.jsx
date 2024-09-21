import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useContext, useState } from "react";
import { CiSearch } from "react-icons/ci";
import MyState from "@/context/data/MyState";
export function SeachDialog() {
    const [search, setSearch] = useState();
    return (
        <Dialog>
            <DialogTrigger asChild><CiSearch className='hover:cursor-pointer' style={{ height: "2rem", width: "2rem", color: "white", marginRight: '5px' }} />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Search</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Search For
                        </Label>
                        <Input
                            id="username"
                            defaultValue=""
                            className="col-span-3"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit">Search</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
