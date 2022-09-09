resource "aws_sqs_queue" "distribute-queue" {
  name                        = "distribute-queue.fifo"
  fifo_queue                  = true
  content_based_deduplication = true
}
