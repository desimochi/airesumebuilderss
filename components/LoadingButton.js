import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";

export default function LoadingButton({loading, disabled, className, ...props}){

        return <Button disabled={loading || disabled} className="flex items-center gap-2" {...props}>
            {loading && <Loader2 className="size-5 animate-spin" />}
            {props.children}
        </Button>
}