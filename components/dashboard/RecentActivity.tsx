import React from 'react'
import { Card } from '../ui/card'
import { Button } from '../ui/button'
import { featuredUsers, icons } from '@/constants'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

const RecentActivity = () => {
  return (
    <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
      
    {/* Recent Activity */}
    <Card className="col-span-1 lg:col-span-2 p-6 bg-neutral-900 text-white border-none">
      <div className="mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <h2 className="text-xl sm:text-2xl font-semibold">Recent Activity</h2>
      </div>
      <div className="space-y-4">
        {/* {icons.map((activity, index) => (
          <div key={index} className="flex items-center gap-4">
            <div className="rounded-full bg-primary/10 p-2">
              <activity.icon className="h-5 w-5 text-primary text-white" />
            </div>
            <div className="flex-1">
              <p className="font-medium">{activity.text}</p>
              <p className="text-sm text-muted-foreground">{activity.time}</p>
            </div>
          </div>
        ))} */}
        No activities yet.
      </div>
    </Card>

    {/* Top Learners */}
    <Card className="p-6 bg-neutral-900 text-white border-none">
      <h2 className="mb-4 text-xl sm:text-2xl font-semibold">Top Learners</h2>
      <div className="space-y-4">
        {featuredUsers.map((user, index) => (
          <div key={index} className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src={user.avatar} />
              <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="font-medium ">{user.name}</p>
              <p className="text-sm text-muted-foreground">{user.xp.toLocaleString()} XP</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  </div>
  )
}

export default RecentActivity