import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import {
  clearAllMessageErrors,
  deleteMessage,
  getAllMessages,
  resetMessagesSlice,
} from "@/store/slice/messageSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import SpecialLoadingButton from "./SpecialLoadingButton";
import { useNavigate } from "react-router-dom";

const Message = () => {
  const navigateTo = useNavigate();

  // Fetch data from the Redux store
  const { messages, loading, error, message } = useSelector(
    (state) => state.messages
  );

  const [messageId, setMessageId] = useState("");

  const dispatch = useDispatch();

  // Fetch messages on component mount
  useEffect(() => {
    dispatch(getAllMessages());
  }, [dispatch]);

  const handleMessageDelete = (id) => {
    setMessageId(id);
    dispatch(deleteMessage(id));
    toast.success("Message Deleted ");
  };

  // Handle error or success messages
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllMessageErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetMessagesSlice());
      dispatch(getAllMessages());
    }
  }, [dispatch, error, message]);

  return (
    <div className="min-h-[100vh] sm:gap-4 sm:py-4 sm:pl-20">
      <Tabs>
        <TabsContent>
          <Card>
            <CardHeader className="flex gap-4 sm:justify-between sm:pr-4  sm:flex-row sm:items-center">
              <CardTitle>Messages</CardTitle>
            </CardHeader>
            <CardContent className="grid sm:grid-cols-2 gap-4">
              {messages && messages.length > 0 ? (
                messages.map((element) => (
                  <Card key={element._id} className="grid gap-2">
                    <CardDescription className="text-slate-950">
                      <span className="font-bold mr-2">Sender Name:</span>
                      {element.senderName}
                    </CardDescription>
                    <CardDescription className="text-slate-950 pr-4">
                      <span className="font-bold mr-2">Subject:</span>
                      {element.subject}
                    </CardDescription>
                    <CardDescription className="text-slate-950 pr-4">
                      <span className="font-bold mr-2 ">Message:</span>
                      {element.message}
                    </CardDescription>
                    <CardFooter className="justify-end">
                      {loading && messageId === element._id ? (
                        <SpecialLoadingButton
                          content={"Deleting"}
                          width={"w-32"}
                        />
                      ) : (
                        <Button
                          className="w-32"
                          onClick={() => handleMessageDelete(element._id)}
                        >
                          Delete
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <CardHeader className="text-2xl">No Messages Found!</CardHeader>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Message;
