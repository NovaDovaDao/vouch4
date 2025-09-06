import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Calendar,
  CalendarCurrentDate,
  CalendarDayView,
  CalendarMonthView,
  CalendarNextTrigger,
  CalendarPrevTrigger,
  CalendarTodayTrigger,
  CalendarViewTrigger,
  CalendarWeekView,
  CalendarYearView,
  useCalendar,
} from "@/components/ui/full-calendar";
import { useQuery } from "@tanstack/react-query";
import { graphql } from "@/graphql";
import { execute } from "@/graphql/execute";
import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  endOfDay,
  endOfMonth,
  endOfWeek,
  endOfYear,
  startOfDay,
  startOfMonth,
  startOfWeek,
  startOfYear,
} from "date-fns";

const GET_GYMS = graphql(`
  query GetGymOptions {
    gyms {
      id
      name
    }
  }
`);

const GET_SCHEDULED_CLASSES = graphql(`
  query GetScheduledClasses($args: ScheduledClassesArgs!) {
    scheduledClasses(args: $args) {
      id
      name
      startTime
      endTime
      gym {
        name
      }
      instructor {
        name
      }
    }
  }
`);

function CalendarWrapper() {
  const { view, date, setEvents } = useCalendar();
  const range = useMemo(() => {
    let startDate = date;
    let endDate = date;

    switch (view) {
      case "day":
        startDate = startOfDay(date);
        endDate = endOfDay(date);
        break;
      case "month":
        startDate = startOfMonth(date);
        endDate = endOfMonth(date);
        break;
      case "week":
        startDate = startOfWeek(date);
        endDate = endOfWeek(date);
        break;
      case "year":
        startDate = startOfYear(date);
        endDate = endOfYear(date);
    }
    return {
      startDate,
      endDate,
    };
  }, [view, date]);

  const { data: gyms } = useQuery({
    queryKey: ["gym-options"],
    queryFn: () => execute(GET_GYMS),
    select: (data) => data.gyms ?? [],
  });

  const [gymId, setGymId] = useState<string>();
  const { data, isLoading } = useQuery({
    queryKey: ["scheduled-classes", range.startDate, range.endDate, gymId],
    queryFn: () =>
      execute(GET_SCHEDULED_CLASSES, {
        args: { gymId, startDate: range.startDate, endDate: range.endDate },
      }),
  });

  useEffect(() => {
    setEvents(
      data?.scheduledClasses.map((sc) => ({
        id: sc.id,
        end: new Date(sc.endTime),
        start: new Date(sc.startTime),
        title: sc.name,
        color: "green",
      })) ?? [],
    );
  }, [data?.scheduledClasses, setEvents]);

  return (
    <div className="px-4 lg:px-6 flex flex-col h-full">
      <div className="gap-2 mb-6 flex flex-col lg:flex-row lg:justify-between">
        <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
          <Select
            onValueChange={(value) =>
              setGymId(value === "all" ? undefined : value)
            }
            disabled={isLoading}
          >
            <SelectTrigger className="">
              <SelectValue placeholder="All Gyms" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Gyms</SelectItem>
              {gyms?.map((gym) => (
                <SelectItem key={gym.id} value={gym.id}>
                  {gym.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex-1">
            <CalendarViewTrigger
              className="aria-[current=true]:bg-accent"
              view="day"
            >
              Day
            </CalendarViewTrigger>
            <CalendarViewTrigger
              view="week"
              className="aria-[current=true]:bg-accent"
            >
              Week
            </CalendarViewTrigger>
            <CalendarViewTrigger
              view="month"
              className="aria-[current=true]:bg-accent"
            >
              Month
            </CalendarViewTrigger>
            <CalendarViewTrigger
              view="year"
              className="aria-[current=true]:bg-accent"
            >
              Year
            </CalendarViewTrigger>
          </div>
        </div>

        <div className="flex gap-4 items-center">
          <div className="flex-1">
            <CalendarCurrentDate />
          </div>
          <div className="flex items-center gap-2">
            <CalendarPrevTrigger>
              <ChevronLeft size={20} />
              <span className="sr-only">Previous</span>
            </CalendarPrevTrigger>

            <CalendarTodayTrigger>Today</CalendarTodayTrigger>

            <CalendarNextTrigger>
              <ChevronRight size={20} />
              <span className="sr-only">Next</span>
            </CalendarNextTrigger>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <CalendarDayView />
        <CalendarWeekView />
        <CalendarMonthView />
        <CalendarYearView />
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Calendar>
      <CalendarWrapper />
    </Calendar>
  );
}
