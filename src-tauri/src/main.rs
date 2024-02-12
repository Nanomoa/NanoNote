// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use serde::__private::ser::constrain;

pub mod utils;

// Md转Html
#[tauri::command(rename_all = "snake_case")]
fn md_to_html(content: String, file_name: String) {
  utils::export_md::ExportMd::new(content).to_html(file_name).unwrap();
}

// Md转Pdf
#[tauri::command(rename_all = "snake_case")]
fn md_to_pdf(content: String, file_name: String) {
  utils::export_md::ExportMd::new(content).to_pdf(file_name).unwrap()
}

// 获取Notes目录下所有文件
#[tauri::command(rename_all = "snake_case")]
fn get_all_md_files() -> Vec<String> {
  let path = std::path::Path::new(&dirs::home_dir().unwrap()).join("NanoNote").join("Notes");
  utils::file_util::FileUtil::new().get_md_files_in_dir(path.to_str().unwrap()).expect("Error_").into()
}

// 获取文件标识符
#[tauri::command(rename_all = "snake_case")]
fn get_file_ino(path: String) -> u64 {
  utils::file_util::FileUtil::new().get_file_indentifier(path).unwrap()
}

// 获取文件内容
#[tauri::command(rename_all = "snake_case")]
fn get_file_content(path: String) -> String {
  // utils::file_util::FileUtil::new().read_from_md_file(&path).unwrap().into()
  match utils::file_util::FileUtil::new().read_from_md_file(&path) {
    Ok(content) => content.into(),
    Err(e) => e.to_string().into()
  }
}

// 向文件写入内容
#[tauri::command(rename_all = "snake_case")]
fn write_to_file(content: String, path: String) {
  utils::file_util::FileUtil::new().write_to_md_file(path.as_str(), content.as_str()).unwrap();
}

fn main() {
  // 首次进入应用在用户目录创建NanoNote目录
  let user_dir = match dirs::home_dir() {
    Some(dir) => dir,
    None => {
      eprintln!("Error: Can't get the user dir!");
      return;
    }
  };

  let nano_note_dir = std::path::Path::new(&user_dir).join("NanoNote");
  if !nano_note_dir.exists() {
    std::fs::create_dir_all(&nano_note_dir).unwrap();
  }

  // 创建 Notes, Pdf, Html 子目录
  let sub_dirs = ["Notes", "Pdf", "Html"];
  for dir in sub_dirs.iter() {
    let sub_dir = nano_note_dir.join(dir);
    if !sub_dir.exists() {
      std::fs::create_dir_all(&sub_dir).unwrap();
    }
  }

  // let content = get_file_content("/data/home/Nanomoa/NanoNote/Notes/测试文档.md".parse().unwrap());
  // println!("{}", content);

  // let cc = get_file_content("/data/home/Nanomoa/NanoNote/Notes/Markdown教程.md".parse().unwrap());
  // println!("{}", cc);

  // 构建应用
  tauri::Builder::default()
      .invoke_handler(tauri::generate_handler![
        md_to_html,
        md_to_pdf,
        get_all_md_files,
        get_file_ino,
        get_file_content,
        write_to_file
      ])
      .run(tauri::generate_context!())
      .expect("error while running tauri application");
}