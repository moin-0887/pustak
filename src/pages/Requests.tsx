
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Calendar, User } from 'lucide-react';

const Requests = () => {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Rental Requests</h1>
        <p className="text-muted-foreground">Manage your rental requests and view their status</p>
      </div>

      <div className="grid gap-6">
        {/* Incoming Requests Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="mr-2 h-5 w-5" />
              Incoming Requests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Requests from other users to rent your books will appear here.
            </p>
          </CardContent>
        </Card>

        {/* My Requests Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="mr-2 h-5 w-5" />
              My Requests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Books you have requested to rent will appear here.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Requests;
