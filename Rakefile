<<<<<<< HEAD
<<<<<<< Updated upstream
=======
>>>>>>> f06e9359e657ff949df11cf5524d8423e069c6cc
require "tmpdir"

source_branch = "master"
production_branch = "gh-pages"

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
  puts "\n## Committing site build at #{Time.now.utc}"
  message = "Build site at #{Time.now.utc}"
  status = system("git commit -m \"#{message}\"")
  puts status ? "Success" : "Failed"
  puts "\n## Pushing commits to remote"
  status = system("git push origin #{source_branch}")
  puts status ? "Success" : "Failed"
end

desc "Deploy _site/ to #{production_branch} branch"
task :deploy do
  Dir.mktmpdir do |tmp|
    puts "\n## Moving #{source_branch} branch _site contents to tmp folder"
    status = system("mv _site/* #{tmp}")
    puts status ? "Success" : "Failed"
    puts "\n## Switching to #{production_branch} branch"
    status = system("git checkout #{production_branch}")
    puts status ? "Success" : "Failed"

<<<<<<< HEAD
=======
    puts "\n## Pulling most recent #{production_branch} branch from remote"
    status = system("git pull")
    puts status ? "Success" : "Failed"
>>>>>>> f06e9359e657ff949df11cf5524d8423e069c6cc
    puts "\n## Removing #{production_branch} branch contents"
    status = system("rm -rf *")
    puts status ? "Success" : "Failed"

    puts "\n## Moving contents in tmp folder to #{production_branch} branch"
    status = system("mv #{tmp}/* .")
    puts status ? "Success" : "Failed"
  end
  puts "\n## Adding #{production_branch} branch changes"
  status = system("git add -A")
  puts status ? "Success" : "Failed"
  puts "\n## Committing production site at #{Time.now.utc}"
  message = "Build production site at #{Time.now.utc}"
  status = system("git commit -m \"#{message}\"")
  puts status ? "Success" : "Failed"
  puts "\n## Pushing commits to remote"
  status = system("git push origin #{production_branch}")
  puts status ? "Success" : "Failed"

  puts "\n## Switching back to #{source_branch} branch"
  status = system("git checkout #{source_branch}")
  puts status ? "Success" : "Failed"
end

desc "Commit and deploy _site/"
task :default => [:commit, :deploy] do
end
<<<<<<< HEAD
=======
    require 'rubygems'
    require 'rake'
    require 'rdoc'
    require 'date'
    require 'yaml'
    require 'tmpdir'
    require 'jekyll'

    desc "Generate page files"
    task :generate do
      Jekyll::Site.new(Jekyll.configuration({
        "source"      => ".",
        "destination" => "_site"
      })).process
    end


    desc "Generate and publish pages to gh-pages"
    task :publish => [:generate] do
      Dir.mktmpdir do |tmp|
        system "mv _site/* #{tmp}"
        system "git checkout gh-pages"
        system "rm -rf *"
        system "mv #{tmp}/* ."
        message = "Site updated at #{Time.now.utc}"
        system "git add -A"
        system "git commit -am #{message.shellescape}"
        system "git push origin gh-pages --force"
        system "git checkout master"
        system "echo gh-pages updated!"
      end
    end

task :default => :publish
>>>>>>> Stashed changes
=======
>>>>>>> f06e9359e657ff949df11cf5524d8423e069c6cc
