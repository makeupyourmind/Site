package main

import (
  "fmt"
  "github.com/sendgrid/sendgrid-go"
  "os"
)

func main()
{
  sendgridKey := os.Getenv("SENDGRID_API_KEY")
  if sendgridKey == ""
  {
    os.Exit(1);
  }
  sg := sendgrid.NewSendGridClientWithApiKey(sendgridKey)
}
