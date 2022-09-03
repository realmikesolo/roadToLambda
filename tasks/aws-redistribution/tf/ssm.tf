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

resource "aws_ssm_parameter" "db-name" {
  name  = "db-name"
  type  = "SecureString"
  value = "admin"
}

resource "aws_ssm_parameter" "db-username" {
  name  = "db-username"
  type  = "SecureString"
  value = "admin"
}

resource "aws_ssm_parameter" "db-password" {
  name  = "db-password"
  type  = "SecureString"
  value = aws_db_instance.mysql.password
}

resource "aws_ssm_parameter" "db-port" {
  name  = "db-port"
  type  = "SecureString"
  value = aws_db_instance.mysql.port
}

resource "aws_ssm_parameter" "db-host" {
  name  = "db-host"
  type  = "SecureString"
  value = aws_db_instance.mysql.address
}

resource "aws_ssm_parameter" "security-group-id" {
  name  = "security-group-id"
  type  = "SecureString"
  value = "sg-0b973760885ce9ff6"
}

resource "aws_ssm_parameter" "subnet-id-1" {
  name  = "subnet-id-1"
  type  = "SecureString"
  value = "subnet-0df9fcde25b0ca9cc"
}

resource "aws_ssm_parameter" "subnet-id-2" {
  name  = "subnet-id-2"
  type  = "SecureString"
  value = "subnet-015a8d445d3dc30c5"
}

resource "aws_ssm_parameter" "subnet-id-3" {
  name  = "subnet-id-3"
  type  = "SecureString"
  value = "subnet-022faa672ba8a8298"
}
