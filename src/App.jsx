import React, { useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/customModal"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Copy, User } from 'lucide-react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import axios from 'axios';
import FormOne from './views/formOne'
import FromTwo from './views/formTwo'
import FromThree from './views/formThree'

function App() {

  const [activetab, setActiveTab] = useState(0);
  const [open, setOpen] = useState(false);
  const [usersData, setUsersData] = useState([]);
  const usersList = useSelector((state) => state.finalForm)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    await axios.get('http://localhost:3000/api/users').then((res) => {
      setUsersData(res?.data)
    })
  }

  const toggler = () => {
    setOpen(false)
  }

  const nextStep = () => {
    setActiveTab(activetab + 1);
  };

  const prevStep = () => {
    setActiveTab(activetab - 1);
  };

  const Formsteps = () => {
    switch (activetab) {
      case 0:
        return <FormOne nextStep={nextStep} prevStep={prevStep} />
      case 1:
        return <FromTwo nextStep={nextStep} prevStep={prevStep} />
      case 2:
        return <FromThree toggler={toggler} prevStep={prevStep} resetForm={setActiveTab} />
      default:
        return <></>
    }
  }

  return (
    <div className='bg-[#F5F5F5] min-h-screen p-4'>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>User List</CardTitle>
            <Button className="flex gap-2 items-center" onClick={() => setOpen(!open)}>
              <User size={20} />
              Add User
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">S.NO</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>DOB</TableHead>
                <TableHead>Mobile</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>Address</TableHead>
              </TableRow>
            </TableHeader>
            {usersData.length > 0 ?
              <TableBody>
                {usersData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>
                      <div className='flex items-center gap-4'>
                        <p>{row.email}</p>
                        <Copy size={20} type='button' />
                      </div>
                    </TableCell>
                    <TableCell>{moment(row.date).format("DD/MM/YYYY")}</TableCell>
                    <TableCell>{row.mobile}</TableCell>
                    <TableCell>{row.gender}</TableCell>
                    <TableCell>
                      <p>{row.line1}</p>
                      <p>{row.line2}</p>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              :
              <TableCaption className="my-12">
                No data found.
              </TableCaption>
            }
          </Table>
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen} >
        <DialogContent className="sm:max-w-[50vw]">
          <DialogHeader>
            <DialogTitle>Add user</DialogTitle>
            <DialogDescription>
              Fill all your requested details here.
            </DialogDescription>
          </DialogHeader>
          <div className='mt-6'>
            {Formsteps()}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default App
