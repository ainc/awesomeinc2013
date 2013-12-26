require "reduce"

source_branch = "master"
production_branch = "huu_branch"

desc "Delete _site/"
task :delete do
  puts "\## Deleting _site/"
  status = system("rm -r _site")
  puts status ? "Success" : "Failed"
end

desc "Commit _site/"
task :commit do
  puts "\n## Building _site files"
  status = system("jekyll build")
  puts status ? "Success" : "Failed"

  puts "\n## Staging modified files"
  status = system("git add -A")
  puts status ? "Success" : "Failed"
  puts "\n## Committing a site build at #{Time.now.utc}"
  message = "Build site at #{Time.now.utc}"
  status = system("git commit -m \"#{message}\"")
  puts status ? "Success" : "Failed"
  puts "\n## Pushing commits to remote"
  status = system("git push origin #{source_branch}")
  puts status ? "Success" : "Failed"
end

desc "Deploy _site/ to #{production_branch} branch"
task :deploy do
  puts "\n## Deleting #{production_branch} branch"
  status = system("git branch -D #{production_branch}")
  puts status ? "Success" : "Failed"
  puts "\n## Creating new #{production_branch} branch and switching to it"
  status = system("git checkout -b #{production_branch}")
  puts status ? "Success" : "Failed"
  puts "\n## Forcing the _site subdirectory to be project root"
  status = system("git filter-branch --subdirectory-filter _site/ -f")
  puts status ? "Success" : "Failed"
  puts "\n## Switching back to #{source_branch} branch"
  status = system("git checkout #{source_branch}")
  puts status ? "Success" : "Failed"
  puts "\n## Pushing all branches to origin"
  status = system("git push --all origin")
  puts status ? "Success" : "Failed"
end

desc "Commit and deploy _site/"
task :commit_deploy => [:commit, :deploy] do
end
