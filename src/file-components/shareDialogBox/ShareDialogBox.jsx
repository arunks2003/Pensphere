import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CiShare2 } from "react-icons/ci";
import { useState } from "react";
import toast from "react-hot-toast";

export function ShareDialogBox() {
    const [link, setLink] = useState(window.location.href);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(link)
            .then(() => {
                toast.success("Link copied!!")
            })
            .catch(err => {
                console.error("Failed to copy: ", err);
            });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <CiShare2 className='hover:cursor-pointer' style={{ height: "2rem", width: "2rem", color: "white", marginRight: '5px' }} />
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Share link</DialogTitle>
                    <DialogDescription>
                        Anyone who has this link will be able to view this.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                    <div className="grid flex-1 gap-2">
                        <Label htmlFor="link" className="sr-only">
                            Link
                        </Label>
                        <Input
                            id="link"
                            value={link}
                            readOnly
                        />
                    </div>
                    <Button onClick={copyToClipboard} size="sm" className="px-3">
                        <span className="sr-only">Copy</span>
                        <Copy className="h-4 w-4" />
                    </Button>
                </div>
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
