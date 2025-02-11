import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { PaletteIcon } from "lucide-react";
import { SketchPicker, TwitterPicker } from "react-color"; // Assuming you're using this for color selection

export default function ColorPicker({ color, onChange }) {
    const [showPopover, setShowPopover] = useState(false);
    const handleChange = (color) => {
        console.log("Selected color:", color.hex);
        onChange(color);
    };
    return (
        <Popover open={showPopover} onOpenChange={setShowPopover}>
            <PopoverTrigger asChild>
                <Button variant="outline" size="icon" title="change resume color" onClick ={()=> setShowPopover(true)}>
                    <PaletteIcon className="size-5" />
                </Button>
            </PopoverTrigger>
            <PopoverContent  className="border-none bg-transparent shadow-none" align="end">
                <TwitterPicker color={color} onChange={handleChange} triangle="top-right" />
            </PopoverContent>
        </Popover>
    );
}
