resource "aws_dynamodb_table" "redistribution" {
  name           = "redistribution"
  billing_mode   = "PROVISIONED"
  read_capacity  = 15
  write_capacity = 15
  hash_key       = "hashKey"
  range_key      = "rangeKey"
  stream_enabled = true
  stream_view_type = "KEYS_ONLY"

  attribute {
    name = "hashKey"
    type = "S"
  }
  attribute {
    name = "rangeKey"
    type = "S"
  }
}
