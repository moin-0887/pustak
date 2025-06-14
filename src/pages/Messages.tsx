
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, Inbox, Send } from 'lucide-react';

const Messages = () => {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Messages</h1>
        <p className="text-muted-foreground">Communicate with other users about book rentals</p>
      </div>

      <div className="grid gap-6">
        {/* Inbox Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Inbox className="mr-2 h-5 w-5" />
              Inbox
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Your received messages will appear here.
            </p>
          </CardContent>
        </Card>

        {/* Sent Messages Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Send className="mr-2 h-5 w-5" />
              Sent Messages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Messages you have sent will appear here.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Messages;
