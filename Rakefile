require 'rake'

desc "Compiles js.coffee files from src to demo"
task :build_js => :environment do
  require 'coffee_script'
  puts "..."
  puts "Building output.js"
  
  begin
    output_file_path = "./demo/output.js"
    source_directory_path = "./src"
    content = "// DO NOT MODIFY this file, auto-generated from all js.coffee files in #{source_directory_path}\n\n"
    content = content + "// global log method \n" + File.read("./lib/log.js") + "\n"
  
    File.delete(output_file_path) if File.exist?(output_file_path)
    Dir.glob("#{source_directory_path}/**/*.js.coffee").each do |file|
      puts "  - compile #{file}"
      compiled = CoffeeScript.compile File.read(file)
      content = content + "// compiled #{file} \n#{compiled}\n"
    end

    content = content + "// plugin: validity \n" + File.read("./src/plugin.js")
    
    File.open(output_file_path, "w") { |file| file << content }

    puts "  Rewrote #{output_file_path}"
    puts "Done building output.js"
  rescue Exception => ex
    puts ex
  end
end
begin
  require 'jasmine'
  load 'jasmine/tasks/jasmine.rake'
rescue LoadError
  task :jasmine do
    abort "Jasmine is not available. In order to run jasmine, you must: (sudo) gem install jasmine"
  end
end
