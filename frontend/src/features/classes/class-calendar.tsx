import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GetClassesQuery } from "@/graphql/graphql";
import { useState } from "react";

interface ClassCalendarProps {
  classes: GetClassesQuery["classes"];
  onDateChange: (date: Date | undefined) => void;
}

export function ClassCalendar({ classes, onDateChange }: ClassCalendarProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const handleDateChange = (newDate: Date | undefined) => {
    setDate(newDate);
    onDateChange(newDate);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Class Calendar</CardTitle>
      </CardHeader>
      <CardContent>
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateChange}
          className="rounded-md border"
        />
        <div>
          <h3 className="text-lg font-medium">Classes for {date?.toLocaleDateString()}</h3>
          <ul>
            {classes.map((c) => (
              <li key={c.id}>
                <strong>{c.name}</strong> at {new Date(c.scheduleDateTime).toLocaleTimeString()}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
