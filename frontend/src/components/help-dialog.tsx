import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  IconBrandSlack,
  IconExternalLink,
  IconMail,
} from "@tabler/icons-react";

interface HelpDialogProps {
  handleOpen: (isOpen: boolean) => void;
}

export default function HelpDialog({ handleOpen }: HelpDialogProps) {
  return (
    <Dialog open onOpenChange={handleOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Need a hand?</DialogTitle>
          <DialogDescription>
            We're here to help. Our team of experts is on standby to answer your
            questions and get you back on track.
          </DialogDescription>
        </DialogHeader>
        <div className="grid lg:grid-cols-2 gap-4">
          <a
            href="https://join.slack.com/t/climbtampabay/shared_invite/zt-3bztncody-CeFyZjRMDl5wzbOe5fII~A"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="outline"
              size="lg"
              className="flex flex-col h-full w-full p-4"
            >
              <IconBrandSlack className="size-8" />
              <span className="text-lg">Visit our help center</span>
              <p className="text-sm text-muted-foreground text-wrap">
                Get instant answers to common questions.
              </p>
            </Button>
          </a>
          <a href="mailto:alex.valle@gmail.com">
            <Button
              variant="outline"
              size="lg"
              className="flex flex-col h-full w-full p-4"
            >
              <IconMail className="size-8" />
              <span className="text-lg">Email us</span>
              <p className="text-sm text-muted-foreground text-wrap">
                A real human will get back to you shortly.
              </p>
            </Button>
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
}
