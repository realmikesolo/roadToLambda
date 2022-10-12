resource "aws_ssm_parameter" "distribute-queue-url" {
  name  = "distribute-queue-url"
  type  = "String"
  value = aws_sqs_queue.distribute-queue.url
}

resource "aws_ssm_parameter" "distribute-queue-arn" {
  name  = "distribute-queue-arn"
  type  = "String"
  value = aws_sqs_queue.distribute-queue.arn
}

resource "aws_ssm_parameter" "db-host" {
  name  = "db-host"
  type  = "String"
  value = "lambda-team-1.cqjlbm8qlo33.eu-central-1.rds.amazonaws.com"
}

resource "aws_ssm_parameter" "db-port" {
  name  = "db-port"
  type  = "String"
  value = 5432
}

resource "aws_ssm_parameter" "db-username" {
  name  = "db-username"
  type  = "String"
  value = "postgres"
}

resource "aws_ssm_parameter" "db-password" {
  name  = "db-password"
  type  = "String"
  value = "postgres"
}

resource "aws_ssm_parameter" "db-name" {
  name  = "db-name"
  type  = "String"
  value = "my_db"
}

resource "aws_ssm_parameter" "dynamodb-stream-arn" {
  name = "dynamodb-stream-arn"
  type = "String"
  value = aws_dynamodb_table.redistribution.stream_arn
}
