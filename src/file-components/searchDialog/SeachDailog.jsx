import React, { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CiSearch } from "react-icons/ci";
import MyContext from "@/context/data/MyContext";
import Loader from "../loader/Loader";

export function SeachDialog() {
    const [search, setSearch] = useState('');
    const [open, setOpen] = useState(false);
    const { setSearchKey, suggestion, setFlag, flag } = useContext(MyContext)

    const handleSearchInputChange = (event) => {
        setSearch(event.target.value.toLowerCase());
        setSearchKey(event.target.value.toLowerCase())
    };

    const handleSearch = (event) => {
        event.preventDefault();
        setSearchKey(search.toLowerCase());
        setOpen(false); // Close the dialog
    };
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearch(event);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <CiSearch className='hover:cursor-pointer' style={{ height: "2rem", width: "2rem", color: "white", marginRight: '5px' }} />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Search</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="search" className="text-right">
                            Search For
                        </Label>
                        <Input
                            id="search"
                            value={search}
                            onChange={handleSearchInputChange}
                            onKeyDown={handleKeyDown}
                            defaultValue=""
                            className="col-span-3"
                        />
                    </div>
                    {suggestion.length > 0 ? <>{
                        suggestion.map((item, index) => {
                            return (
                                <div className="max-w-sm max-h-64 overflow-y-auto rounded overflow-hidden shadow-lg hover:cursor-pointer hover:shadow-2xl hover:scale-105 transition-transform duration-300" key={index}>
                                    <p onClick={(e) => { setSearchKey(item); setSearch(item); console.log(item); setFlag(!flag); }}>{item}</p>
                                </div>
                            )
                        })
                    }</>
                        : <>{
                            search ?
                                <Loader>
                                </Loader> : ""
                        }
                        </>}
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={handleSearch} >Search</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}