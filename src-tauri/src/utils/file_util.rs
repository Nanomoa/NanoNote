use std::fs::File;
use std::io::{Error, Read, Write};
use std::os::unix::fs::MetadataExt;
use chrono::{Datelike, Local, Timelike};

pub struct FileUtil;

impl FileUtil {
    pub fn new() -> Self {
        FileUtil { }
    }

    // 新建文件并写入内容
    pub fn create_and_write(&self, path: String) -> Result<(), Error> {
        let file_path = std::path::Path::new(path.as_str());

        if !file_path.exists() {
            let file_path_str = file_path.to_str().unwrap();

            let mut md_file = match File::create(file_path_str) {
                Ok(file) => file,
                Err(e) => {
                    return Err(e);
                }
            };

            let path_vec: Vec<String> = path.split('/').map(String::from).collect();
            let file_name_vec: Vec<String> = path_vec.last().unwrap().split('.').map(String::from).collect();
            let title = file_name_vec.first().unwrap();

            let now_time = Local::now();
            let now_time_fmt = format!(
                "{:04}-{:02}-{:02} {:02}:{:02}:{:02}",
                now_time.year(),
                now_time.month(),
                now_time.day(),
                now_time.hour(),
                now_time.minute(),
                now_time.second(),
            );

            let content = format!(r#"
  ---
  title: {}
  date: {}
  ---
  "#, title, now_time_fmt);

            if let Err(e) = md_file.write_all(content.as_bytes()) {
                Err(e)
            } else {
                Ok(())
            }
        } else {
            Err(Error::from(std::io::ErrorKind::Other))
        }
    }

    // 删除文件
    pub fn remove(&self, path: String) -> Result<(), Error> {
        if let Err(e) = std::fs::remove_file(path) {
            Err(e)
        } else {
            Ok(())
        }
    }

    // 清空原内容写入新内容
    pub fn write_to_md_file(&self, path: &str, content: &str) -> Result<(), Error> {
        let mut file = std::fs::OpenOptions::new()
            .write(true)
            .truncate(true)
            .open(path)?;
        file.write_all(content.as_bytes())?;
        Ok(())
    }

    // 读取文件内容
    pub fn read_from_md_file(&self, path: &str) -> Result<String, Error> {
        let mut file = File::open(path)?;
        let mut content = String::new();
        file.read_to_string(&mut content)?;
        Ok(content)
    }

    // 获取目录下所有md文件的绝对路径
    pub fn get_md_files_in_dir(&self, dir: &str) -> Result<Vec<String>, Error> {
        let mut markdown_files = Vec::new();

        let entries = std::fs::read_dir(dir)?;

        for entry in entries {
            let entry = entry?;
            let path = entry.path();

            if path.is_dir() {
                continue;
            }

            if path.extension().unwrap() == "md" {
                markdown_files.push(path.to_str().unwrap().to_string());
            }
        }

        Ok(markdown_files)
    }

    // 获取文件的inode编号
    pub fn get_ino(&self, path: String) -> Result<u64, Error> {
        let file_path = std::path::Path::new(&path);

        if !file_path.exists() {
            Ok(1145141919810)
        }

        let file_path_str = file_path.to_str().unwrap();

        let ino = match std::fs::metadata(file_path_str) {
            Ok(meta_data) => meta_data.ino(),
            Err(e) => {
                return Err(e);
            }
        };

        Ok(ino)
    }
}