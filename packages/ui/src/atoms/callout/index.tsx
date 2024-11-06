import { Card, CardContent, CardFooter } from "../card";
import { Button } from "../button";

import type { Props } from "./index.types.ts";

export function Callout({ heading, body, links }: Props) {
  return (
    <Card className="bg-primary/10 border-none">
      <CardContent className="flex flex-col h-full p-6">
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-2">{heading}</h3>
          <p className="text-muted-foreground mb-6">{body}</p>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex flex-wrap gap-4">
          {links?.map((link) => (
            <Button key={link.id} href={link.url} variant={link.variant}>
              {link.displayText}
            </Button>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
}
