resource "aws_db_instance" "mysql" {
  allocated_storage = 10
  engine            = "mysql"
  engine_version    = "5.7"
  instance_class    = "db.t3.micro"
  db_name           = aws_ssm_parameter.db-name.value
  username          = aws_ssm_parameter.db-username.value
  password          = random_password.password.result
  identifier        = "lambda-db"
}

resource "random_password" "password" {
  length  = 20
  special = false
}
