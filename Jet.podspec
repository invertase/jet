require 'json'
package = JSON.parse(File.read('./package.json'))

Pod::Spec.new do |s|
  s.name                = "Jet"
  s.version             = package["version"]
  s.summary             = package["description"]
  s.description         = <<-DESC
                            #{package["description"]}
                          DESC
  s.homepage            = "http://invertase.io/jet"
  s.license             = package['license']
  s.authors             = "Mike Diarmid (Salakar)"
  s.source              = { :git => package["url"], :tag => "v#{s.version}" }
  s.social_media_url    = 'http://twitter.com/invertaseio'
  s.platform            = :ios, "10.0"
  s.source_files        = '*.{h,m}'
  s.dependency          'React-Core'
end
