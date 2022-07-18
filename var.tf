variable "env" {
  description = "Depolyment environment"
  default     = "dev"
}

variable "github_branch" {
  description = "Repository branch to connect to"
  default     = "main"
}

variable "github_owner" {
  description = "GitHub repository owner"
  default     = "shivani3495"
}

variable "github_repo" {
  description = "GitHub repository name"
  default     = "build-apk"
}

variable "github_token" {
  description = "This is github authentication token"
  default = "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"
  type = string
}

variable "artifacts_bucket_name" {
  description = "S3 Bucket for storing artifacts"
  default     = "artifacts-bucket-devops"
}